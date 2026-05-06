import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-4">Something went wrong</h1>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left overflow-hidden">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Error Details</p>
               <p className="text-xs font-mono text-rose-600 break-all">{this.state.error?.message || 'Unknown error'}</p>
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
              <RefreshCw className="w-5 h-5" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
