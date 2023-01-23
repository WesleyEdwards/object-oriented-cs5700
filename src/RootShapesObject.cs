namespace ShapesProject
{
    public class ShapesStats
    {
        public string ShapeName { get; set; }
        public int TotalArea { get; set; }
        public int TotalShapes { get; set; }
        public ShapesStats(string name, int area, int totalShapes)
        {
            this.ShapeName = name;
            this.TotalArea = area;
            this.TotalShapes = totalShapes;
        }
    }
    public class ShapesContainer
    {
        public Circle[]? Circles { get; set; }
        public Ellipse[]? Ellipses { get; set; }
        public Square[]? Squares { get; set; }
        public Rectangle[]? Rectangles { get; set; }
        public Triangle[]? Triangles { get; set; }
        public ShapesContainer() { }
        public ShapesStats[] GetShapesStats()
        {
            var circle = this.GetAreaOfShape(this.Circles);
            var ellipse = this.GetAreaOfShape(this.Ellipses);
            var square = this.GetAreaOfShape(this.Squares);
            var rectangle = this.GetAreaOfShape(this.Rectangles);

            var triangle = this.GetAreaOfShape(this.Triangles);
            var scalene = this.GetAreaTriangle(this.Triangles, TriType.Scalene);
            var isosceles = this.GetAreaTriangle(this.Triangles, TriType.Isosceles);
            var equilateral = this.GetAreaTriangle(this.Triangles, TriType.Equilateral);

            var polyLength = (this.Squares?.Length ?? 0) + (this.Rectangles?.Length ?? 0) + (this.Triangles?.Length ?? 0);

            return new ShapesStats[]
            {
                new ShapesStats("Ellipses", circle + ellipse, this.Ellipses?.Length ?? 0),
                new ShapesStats("Circles", circle, this.Circles?.Length ?? 0),
                new ShapesStats("Non-Circular Ellipses", ellipse, this.Ellipses?.Length ?? 0),
                new ShapesStats("Convex Polygons", square + rectangle + triangle, polyLength),
                new ShapesStats("Triangles", triangle, this.Triangles?.Length ?? 0),
                new ShapesStats("Scalene", scalene, this?.GetTriLength(TriType.Scalene) ?? 0),
                new ShapesStats("Isosceles", isosceles, this?.GetTriLength(TriType.Isosceles) ?? 0),
                new ShapesStats("Equilateral", equilateral, this?.GetTriLength(TriType.Equilateral) ?? 0),
                new ShapesStats("Rectangles", rectangle, this.Rectangles?.Length ?? 0),
                new ShapesStats("Squares", square, this.Squares?.Length ?? 0),
            };
        }
        public int GetAreaOfShape(IShape[]? shapes)
        {
            int totalArea = 0;
            if (shapes != null)
            {
                foreach (var shape in shapes)
                {
                    totalArea += (int)shape.Area;
                }
            }
            return totalArea;
        }
        public int GetAreaTriangle(Triangle[]? shapes, TriType type)
        {
            int totalArea = 0;
            if (shapes != null)
            {
                foreach (var shape in shapes)
                {
                    if (shape.Type == type)
                    {
                        totalArea += (int)shape.Area;
                    }
                }
            }
            return totalArea;
        }
        public int GetTriLength(TriType type)
        {
            int totalLength = 0;
            if (this.Triangles != null)
            {
                foreach (var tri in this.Triangles)
                {
                    if (tri.Type == type)
                    {
                        totalLength++;
                    }
                }
            }
            return totalLength;
        }

        public int GetTotalArea()
        {
            int totalArea = 0;
            totalArea += GetAreaOfShape(this.Circles);
            totalArea += GetAreaOfShape(this.Ellipses);
            totalArea += GetAreaOfShape(this.Squares);
            totalArea += GetAreaOfShape(this.Rectangles);
            totalArea += GetAreaOfShape(this.Triangles);
            return totalArea;
        }

        public void filter()
        {
            this.Circles = this.Circles?.Where(x => x.Area > 0).ToArray();
            this.Ellipses = this.Ellipses?.Where(x => x.Area > 0).ToArray();
            this.Squares = this.Squares?.Where(x => x.Area > 0).ToArray();
            this.Rectangles = this.Rectangles?.Where(x => x.Area > 0).ToArray();
            this.Triangles = this.Triangles?.Where(x => x.Area > 0).ToArray();
        }
    }

}