import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Playground() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleRender = () => {
    setError("");
    // The code will be rendered in the preview area
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Component Playground</h1>
        <p className="text-muted-foreground">
          Paste your component code here to test it live. Similar to FigJam board testing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor Area */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Paste Component Code</label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your component JSX/CLI code here..."
              className="min-h-[500px] font-mono text-sm"
            />
          </div>
          <Button onClick={handleRender} className="w-full">
            Render Component
          </Button>
        </div>

        {/* Preview Area */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Live Preview</label>
            <div className="min-h-[500px] border rounded-lg p-6 bg-background-lighter-50">
              {error ? (
                <div className="text-negative-base-500 text-sm">{error}</div>
              ) : code ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Preview will appear here
                  </div>
                  {/* Dynamic component rendering will happen here */}
                  <div
                    className="component-preview"
                    dangerouslySetInnerHTML={{ __html: "" }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Paste code to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 border rounded-lg bg-muted/50">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Paste your component CLI installation code or JSX code</li>
          <li>Click "Render Component" to see the live preview</li>
          <li>Test different components and their variations</li>
          <li>Modify the code and re-render to see changes instantly</li>
        </ul>
      </div>
    </div>
  );
}