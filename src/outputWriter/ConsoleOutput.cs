using System.Text;

namespace ShapesProject
{
    public class ConsoleOutput : IOutputWriter
    {
        public ConsoleOutput() { }
        public void Write(ShapesContainer shapes)
        {
            var tab = "      ";

            var circle = shapes.GetAreaOfShape(shapes.Circles);
            var nonCircleEllipse = shapes.GetAreaOfShape(shapes.Ellipses);
            var nonSquareRectangle = shapes.GetAreaOfShape(shapes.Rectangles);
            var square = shapes.GetAreaOfShape(shapes.Squares);
            var rectangle = nonSquareRectangle + square;

            var triangle = shapes.GetAreaOfShape(shapes.Triangles);
            var scalene = shapes.GetAreaTriangle(shapes.Triangles, TriType.Scalene);
            var isosceles = shapes.GetAreaTriangle(shapes.Triangles, TriType.Isosceles);
            var equilateral = shapes.GetAreaTriangle(shapes.Triangles, TriType.Equilateral);

            string[] stats = new string[]
            {
                $"\n{"Total area of all shapes:",-55} {shapes.GetTotalArea(),20}",
                $"{"Ellipses:",-55} {circle + nonCircleEllipse,20}",
                $"{$"{tab}Circles:",-55} {circle,20}",
                $"{$"{tab}Non-circle Ellipses:",-55} {nonCircleEllipse,20}",
                $"{"Convex Polygons:",-55} {square + triangle + rectangle,20}",
                $"{$"{tab}Triangles:",-55} {triangle,20}",
                $"{$"{tab + tab}Equilateral:",-55} {equilateral,20}",
                $"{$"{tab + tab}Isosceles:",-55} {isosceles,20}",
                $"{$"{tab + tab}Scalene:",-55} {scalene,20}",
                $"{$"{tab}Rectangles:",-55} {rectangle,20}",
                $"{$"{tab + tab}Squares:",-55} {square,20}",
                $"{$"{tab + tab}Non-square Rectangle:",-55} {nonSquareRectangle,20}",
                // $"{$"{tab + tab}Non-square Rectangles:",-55} {square,20}"
            };

            StringBuilder sb = new StringBuilder();
            foreach (var stat in stats)
            {
                sb.AppendLine(stat);
            }

            Console.WriteLine(sb.ToString());
            Console.WriteLine("\n\n");
        }
    }
}