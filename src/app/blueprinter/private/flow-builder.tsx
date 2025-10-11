'use client';

import { useState, useRef } from 'react';

// Define a specific type for the 'data' object to avoid using 'any'
interface NodeData {
  label: string;
  config?: string; // Configuration is optional
}

interface Node {
  id: string;
  type: string;
  x: number;
  y: number;
  data: NodeData; // Use the specific NodeData interface here
}

interface Connection {
  id: string;
  source: string;
  target: string;
}

export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const nodeTypes = [
    { id: 'trigger', name: 'Trigger', icon: '⚡', color: 'bg-green-500' },
    { id: 'action', name: 'Action', icon: '🔧', color: 'bg-blue-500' },
    { id: 'condition', name: 'Condition', icon: '❓', color: 'bg-yellow-500' },
    { id: 'data', name: 'Data', icon: '📊', color: 'bg-purple-500' },
    { id: 'api', name: 'API', icon: '🌐', color: 'bg-indigo-500' },
    { id: 'bot', name: 'Bot', icon: '🤖', color: 'bg-red-500' },
    { id: 'human', name: 'Human', icon: '👤', color: 'bg-gray-500' },
    { id: 'notification', name: 'Notification', icon: '🔔', color: 'bg-orange-500' },
  ];

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` }
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeDrag = (nodeId: string, e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const newX = e.clientX - rect.left - 50;
          const newY = e.clientY - rect.top - 25;
          setNodes(nodes.map(n => 
            n.id === nodeId ? { ...n, x: newX, y: newY } : n
          ));
        }
      }
    }
  };
  
  // Updated to handle both starting and creating a connection
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);

    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      createConnection(nodeId);
    } else {
      setIsConnecting(true);
      setConnectionStart(nodeId);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedNode(null);
      setIsConnecting(false);
      setConnectionStart(null);
    }
  };

  const createConnection = (targetNodeId: string) => {
    if (connectionStart) {
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        source: connectionStart,
        target: targetNodeId
      };
      setConnections([...connections, newConnection]);
    }
    setIsConnecting(false);
    setConnectionStart(null);
  };

  const deleteNode
