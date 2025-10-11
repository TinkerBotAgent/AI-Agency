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

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.source !== nodeId && c.target !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const deleteConnection = (connectionId: string) => {
    setConnections(connections.filter(c => c.id !== connectionId));
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar - Node Palette */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bot Components</h3>
        <div className="space-y-2">
          {nodeTypes.map(type => (
            <div
              key={type.id}
              className={`flex items-center p-3 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors`}
              onClick={() => addNode(type.id)}
            >
              <div className={`w-8 h-8 ${type.color} rounded-full flex items-center justify-center text-white text-sm mr-3`}>
                {type.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{type.name}</span>
            </div>
          ))}
        </div>

        {/* Bot Templates */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Bot Templates</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
              HR RecruiterBot
            </button>
            <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
              Marketing LeadGenBot
            </button>
            <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
              Customer SupportBot
            </button>
            <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
              Financial FinTechBot
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Actions</h4>
          <div className="space-y-2">
            <button className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700">
              Save Flow
            </button>
            <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700">
              Test Flow
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-purple-700">
              Deploy Bot
            </button>
            <button className="w-full bg-gray-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-gray-700">
              Clear Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">Flow Builder</h2>
              <div className="text-sm text-gray-500">
                Nodes: {nodes.length} | Connections: {connections.length}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                Zoom In
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                Zoom Out
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                Fit to Screen
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-hidden bg-gray-50"
          onClick={handleCanvasClick}
          style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
          {/* Connections */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {connections.map(conn => {
              const sourceNode = nodes.find(n => n.id === conn.source);
              const targetNode = nodes.find(n => n.id === conn.target);
              if (!sourceNode || !targetNode) return null;

              return (
                <line
                  key={conn.id}
                  x1={sourceNode.x + 100}
                  y1={sourceNode.y + 25}
                  x2={targetNode.x}
                  y2={targetNode.y + 25}
                  stroke="#6b7280"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="cursor-pointer"
                  onClick={() => deleteConnection(conn.id)}
                />
              );
            })}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map(node => {
            const nodeType = nodeTypes.find(t => t.id === node.type);
            const isSelected = selectedNode === node.id;
            const isConnectingToThis = isConnecting && connectionStart === node.id;

            return (
              <div
                key={node.id}
                className={`absolute w-32 h-16 bg-white border-2 rounded-lg shadow-lg cursor-pointer transition-all ${
                  isSelected ? 'border-blue-500 shadow-blue-200' : 'border-gray-300'
                } ${isConnectingToThis ? 'border-green-500' : ''}`}
                style={{ left: node.x, top: node.y, zIndex: 2 }}
                onMouseDown={(e) => handleNodeDrag(node.id, e)}
                onClick={() => handleNodeClick(node.id)}
              >
                <div className="flex items-center h-full p-2">
                  <div className={`w-8 h-8 ${nodeType?.color} rounded-full flex items-center justify-center text-white text-sm mr-2`}>
                    {nodeType?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700 truncate">
                      {node.data.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {nodeType?.name}
                    </div>
                  </div>
                </div>
                
                {/* Connection Points */}
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full border border-white"></div>
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full border border-white"></div>

                {/* Delete Button */}
                {isSelected && (
                  <button
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl text-gray-300 mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Start Building Your Bot Flow</h3>
                <p className="text-gray-400 mb-4">Drag components from the sidebar to create your automation workflow</p>
                <div className="text-sm text-gray-400">
                  <div>• Drag nodes to position them</div>
                  <div>• Click nodes to connect them</div>
                  <div>• Use templates for quick starts</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedNode && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Properties</h3>
          {(() => {
            const node = nodes.find(n => n.id === selectedNode);
            if (!node) return null;
            
            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Node Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={node.data.label}
                    onChange={(e) => {
                      setNodes(nodes.map(n => 
                        n.id === selectedNode 
                          ? { ...n, data: { ...n.data, label: e.target.value } }
                          : n
                      ));
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Node Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={node.type}
                    onChange={(e) => {
                      setNodes(nodes.map(n => 
                        n.id === selectedNode 
                          ? { ...n, type: e.target.value }
                          : n
                      ));
                    }}
                  >
                    {nodeTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Configuration</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="Enter node configuration..."
                    value={node.data.config || ''}
                    onChange={(e) => {
                      setNodes(nodes.map(n => 
                        n.id === selectedNode 
                          ? { ...n, data: { ...n.data, config: e.target.value } }
                          : n
                      ));
                    }}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Connections</h4>
                  <div className="space-y-2">
                    {connections.filter(c => c.source === selectedNode || c.target === selectedNode).map(conn => (
                      <div key={conn.id} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        {conn.source === selectedNode ? 'Outgoing' : 'Incoming'} connection
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
