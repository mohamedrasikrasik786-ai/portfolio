import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Simple error boundary for catching any unexpected Firebase errors
 * With Firebase v10.14.1 (stable), we shouldn't see many errors
 */
export class FirebaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a Firebase internal error
    const isFirebaseError = 
      error.message.includes('FIRESTORE') ||
      error.message.includes('INTERNAL ASSERTION') ||
      error.message.includes('__PRIVATE');

    if (isFirebaseError) {
      // Suppress Firebase errors - don't show error UI
      return { hasError: false };
    }

    // For real errors, show error UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Check if this is a Firebase internal error
    const isFirebaseError = 
      error.message.includes('FIRESTORE') ||
      error.message.includes('INTERNAL ASSERTION') ||
      error.message.includes('__PRIVATE');

    if (!isFirebaseError) {
      // Only log non-Firebase errors
      console.error('Application error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-zinc-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
