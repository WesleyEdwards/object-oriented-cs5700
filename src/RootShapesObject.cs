namespace ShapesProject
{
    public class ShapeStatsContainer
    {
        public string ShapeName { get; set; }
        public int TotalArea { get; set; }
        public int TotalShapes { get; set; }
        public ShapeStatsContainer(string name, int area, int totalShapes)
        {
            this.ShapeName = name;
            this.TotalArea = area;
            this.TotalShapes = totalShapes;
        }
    }
    public class RootShapesObject
    {
        public Circle[]? Circles { get; set; }
        public Ellipse[]? Ellipses { get; set; }
        public Square[]? Squares { get; set; }
        public Rectangle[]? Rectangles { get; set; }
        public Triangle[]? Triangles { get; set; }
        public RootShapesObject() { }
        public ShapeStatsContainer[] GetShapesStats()
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

            return new ShapeStatsContainer[]
            {
                new ShapeStatsContainer("Ellipses", circle + ellipse, this.Ellipses?.Length ?? 0),
                new ShapeStatsContainer("Circles", circle, this.Circles?.Length ?? 0),
                new ShapeStatsContainer("Non-Circular Ellipses", ellipse, this.Ellipses?.Length ?? 0),
                new ShapeStatsContainer("Convex Polygons", square + rectangle + triangle, polyLength),
                new ShapeStatsContainer("Triangles", triangle, this.Triangles?.Length ?? 0),
                new ShapeStatsContainer("Scalene", scalene, this?.GetTriLength(TriType.Scalene) ?? 0),
                new ShapeStatsContainer("Isosceles", isosceles, this?.GetTriLength(TriType.Isosceles) ?? 0),
                new ShapeStatsContainer("Equilateral", equilateral, this?.GetTriLength(TriType.Equilateral) ?? 0),
                new ShapeStatsContainer("Rectangles", rectangle, this.Rectangles?.Length ?? 0),
                new ShapeStatsContainer("Squares", square, this.Squares?.Length ?? 0),
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