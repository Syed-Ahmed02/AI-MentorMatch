import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '../../../lib/firestoreService';
import { verifyIdToken } from '../../../lib/firebaseAdmin';

export async function GET(request: NextRequest) {
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

    // Get user's resumes from Firestore
    const resumes = await firestoreService.getUserResumes(userId);

    return NextResponse.json({
      success: true,
      resumes,
      count: resumes.length,
    });

  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 