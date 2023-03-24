using System.Text;

namespace ShapesProject
{
    public class ConsoleOutput : IOutputWriter
    {
        public ConsoleOutput() { }
        public void Write(ShapesContainer shapes)
        {
            var tab = "      ";

            var total = shapes.TotalArea();

            var ellipse = shapes.Ellipses?.TotalArea() ?? 0;
            var circle = shapes.Ellipses?.CirclesArea() ?? 0;
            var nonCircleEllipse = shapes.Ellipses?.EllipsesArea() ?? 0;

            var rectangle = shapes.Rectangles?.TotalArea() ?? 0;
            var nonSquareRectangle = shapes.Rectangles?.NonSquaresArea() ?? 0;
            var square = shapes.Rectangles?.SquaresArea() ?? 0;

            var triangle = shapes.Triangles?.TotalArea() ?? 0;
            var scalene = shapes.Triangles?.ScalenesArea() ?? 0;
            var isosceles = shapes.Triangles?.IsoscelesArea() ?? 0;
            var equilateral = shapes.Triangles?.EquilateralsArea() ?? 0;

            Dictionary<string, double> statsDict = new Dictionary<string, double>() {
                {"Total area of all shapes:", total},
                {"Ellipses:", ellipse},
                {$"{tab}Circles:", circle},
                {$"{tab}Non-circle Ellipses:", nonCircleEllipse},
                {"Convex Polygons:", triangle + rectangle},
                {$"{tab}Triangles:", triangle},
                {$"{tab + tab}Equilateral:", equilateral},
                {$"{tab + tab}Isosceles:", isosceles},
                {$"{tab + tab}Scalene:", scalene},
                {$"{tab}Rectangles:", rectangle},
                {$"{tab + tab}Squares:", square},
                {$"{tab + tab}Non-square Rectangles:", nonSquareRectangle}
            };

            StringBuilder sb = new StringBuilder();
            foreach (var stat in statsDict)
            {
                if (stat.Value > 0)
                {
                    sb.AppendLine($"{stat.Key,-55} {Math.Round(stat.Value, 2),20}");
                }
            }
            this.WriteToConsole(sb.ToString());


        }
        private void WriteToConsole(string output)
        {
            Console.WriteLine("\n\n");
            Console.WriteLine(output);
            Console.WriteLine("\n\n");

        }

    }
}