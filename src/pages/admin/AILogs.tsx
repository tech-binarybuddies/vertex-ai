import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AILog {
  id: string;
  endpoint: string;
  request_data: any;
  response_data: any;
  status: string | null;
  created_at: string;
}

const AILogs = () => {
  const [logs, setLogs] = useState<AILog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
    // TODO: Implement fetching AI logs without Supabase
    const data: AILog[] = []; // Simulated data
    setLogs(data);
    setLoading(false);
  };

    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading AI logs...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Integration Logs</h1>
        <p className="text-muted-foreground">Monitor AI API calls and responses</p>
      </div>

      <div className="grid gap-4">
        {logs.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">No AI logs yet</p>
            </CardContent>
          </Card>
        ) : (
          logs.map((log) => (
            <Card key={log.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{log.endpoint}</CardTitle>
                  <Badge variant={log.status === "success" ? "default" : "destructive"}>
                    {log.status || "unknown"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Request:</h4>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {JSON.stringify(log.request_data, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Response:</h4>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {JSON.stringify(log.response_data, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AILogs;
