import { NextRequest, NextResponse } from 'next/server';
import { indexResume } from '../../../genkit/indexResume';
import { firebaseStorage } from '../../../lib/firebaseStorage';
import { firestoreService } from '../../../lib/firestoreService';
import { verifyIdToken } from '../../../lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No valid authorization token provided' },
        { status: 401 }
      );
    }

    // Verify the Firebase ID token
    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid authorization token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Upload file to Firebase Storage
    const uploadResult = await firebaseStorage.uploadFile(file, userId);

    if (!uploadResult.success || !uploadResult.filePath) {
      return NextResponse.json(
        { error: uploadResult.error || 'Failed to upload file to storage' },
        { status: 500 }
      );
    }

    // Create Firestore document for the resume
    const resumeData = {
      userId,
      fileName: uploadResult.filePath.split('/').pop() || file.name,
      originalFileName: file.name,
      storagePath: uploadResult.filePath,
      downloadURL: uploadResult.downloadURL!,
      fileSize: file.size,
      status: 'uploaded' as const,
    };

    const resumeId = await firestoreService.addResume(resumeData);

    // Index the resume from Firebase Storage with Context 7
    const result = await indexResume({ 
      filePath: uploadResult.filePath,
      originalFileName: file.name
    });

    if (!result.success) {
      // Update Firestore status to failed
      await firestoreService.updateResumeStatus(resumeId, 'failed', 0, result.error);
      
      // Clean up the uploaded file
      await firebaseStorage.deleteFile(uploadResult.filePath);
      
      return NextResponse.json(
        { error: result.error || 'Failed to index resume' },
        { status: 500 }
      );
    }

    // Update Firestore status to indexed
    await firestoreService.updateResumeStatus(resumeId, 'indexed', result.documentsIndexed);

    return NextResponse.json({
      success: true,
      message: `Resume uploaded and indexed successfully with Context 7. ${result.documentsIndexed} documents processed.`,
      fileName: file.name,
      filePath: uploadResult.filePath,
      downloadURL: uploadResult.downloadURL,
      resumeId,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 