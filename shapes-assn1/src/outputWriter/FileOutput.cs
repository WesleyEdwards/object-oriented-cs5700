using System.Text;

namespace ShapesProject
{
    class ShapeStatContainer
    {
        public string Name { get; set; }
        public double Area { get; set; }
        public double TotalNumber { get; set; }
        public ShapeStatContainer(string name, double area, int total)
        {
            Name = name;
            Area = area;
            TotalNumber = total;
        }
    }
    public class FileOutput : IOutputWriter
    {
        public string FilePath { get; set; }
        public FileOutput(string filePath)
        {
            FilePath = filePath;
        }
        public void Write(ShapesContainer shapes)
        {
            var csv = new StringBuilder();

            string title = "Total area of all shapes";
            double area = Math.Round(shapes.TotalArea(), 2);

            var newLine = string.Format("{0},{1},{2},{3}", 1, "", title, area);
            csv.AppendLine(newLine);

            var ellipse = shapes.Ellipses?.TotalArea() ?? 0;
            var ellipseLen = shapes.Ellipses?.Circles?.Length ?? 0;

            var circle = shapes.Ellipses?.CirclesArea() ?? 0;
            var circleLen = shapes.Ellipses?.Circles?.Length ?? 0;
            var nonCircleEllipse = shapes.Ellipses?.EllipsesArea() ?? 0;
            var nonCircleEllipseLen = circleLen + ellipseLen;

            var nonSquareRectangle = shapes.Rectangles?.NonSquaresArea() ?? 0;
            var nonSquareRectangleLen = shapes.Rectangles?.NonSquares?.Length ?? 0;
            var rectangle = shapes.Rectangles?.TotalArea() ?? 0;
            var square = shapes.Rectangles?.SquaresArea() ?? 0;
            var squareLen = shapes.Rectangles?.Squares?.Length ?? 0;
            var rectangleLen = nonSquareRectangleLen + squareLen;

            var triangle = shapes.Triangles?.TotalArea() ?? 0;

            var scalene = shapes.Triangles?.ScalenesArea() ?? 0;
            var scaleneLen = shapes.Triangles?.Scalenes?.Length ?? 0;
            var isosceles = shapes.Triangles?.IsoscelesArea() ?? 0;
            var isoscelesLen = shapes.Triangles?.Isosceles?.Length ?? 0;
            var equilateral = shapes.Triangles?.EquilateralsArea() ?? 0;
            var equilateralLen = shapes.Triangles?.Equilaterals?.Length ?? 0;

            var triangleLen = scaleneLen + isoscelesLen + equilateralLen;


            ShapeStatContainer[] cont = new ShapeStatContainer[]
            {
                new ShapeStatContainer("Ellipses", ellipse, ellipseLen),
                new ShapeStatContainer("Circles", circle, circleLen),
                new ShapeStatContainer("Non-circle Ellipses", nonCircleEllipse, ellipseLen),
                new ShapeStatContainer("Convex Polygons", triangle + rectangle, triangleLen + rectangleLen),
                new ShapeStatContainer("Triangles", triangle, triangleLen),
                new ShapeStatContainer("Equilateral", equilateral, equilateralLen),
                new ShapeStatContainer("Isosceles", isosceles, isoscelesLen),
                new ShapeStatContainer("Scalene", scalene, scaleneLen),
                new ShapeStatContainer("Rectangles", rectangle, rectangleLen),
                new ShapeStatContainer("Squares", square, squareLen),
                new ShapeStatContainer("Non-square Rectangles", nonSquareRectangle, nonSquareRectangleLen)
            };

            var index = 2;
            foreach (var stats in cont)
            {
                var line = string.Format("{0},{1},{2},{3}", index, stats.TotalNumber, stats.Name, Math.Round(stats.Area, 2));
                csv.AppendLine(line);
                index++;
            }

            this.WriteToFile(csv.ToString());
        }

        private void WriteToFile(string text)
        {
            File.WriteAllText(this.FilePath, text);
        }
    }
}