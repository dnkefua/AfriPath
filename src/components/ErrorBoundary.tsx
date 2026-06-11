import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Hook crash reporting (Sentry/Crashlytics) here once a DSN is configured.
    console.error("AfriPath crashed:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "32px",
          background: "#131b2e",
          color: "#ffffff",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 800 }}>Something went wrong</h1>
        <p style={{ fontSize: "14px", color: "#dce9ff", maxWidth: "420px", lineHeight: 1.5 }}>
          AfriPath hit an unexpected error. Your saved opportunities and tracker data are safe on
          this device.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "8px",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            background: "#fd761a",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Reload App
        </button>
      </div>
    );
  }
}
