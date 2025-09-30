// BluePrinter MVP - Figma API Integration
export async function GET() {
  return Response.json({
    message: "BluePrinter MVP - Figma to Code Generator",
    status: "ready",
    features: [
      "Figma API integration",
      "Design parsing",
      "Code generation",
      "Export functionality"
    ]
  });
}
