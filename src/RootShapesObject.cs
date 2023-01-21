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
            return new ShapeStatsContainer[]
            {
                new ShapeStatsContainer("Circles", GetAreaOfShape(this.Circles), this.Circles?.Length ?? 0),
                new ShapeStatsContainer("Ellipses", GetAreaOfShape(this.Ellipses), this.Ellipses?.Length ?? 0),
                new ShapeStatsContainer("Squares", GetAreaOfShape(this.Squares), this.Squares?.Length ?? 0),
                new ShapeStatsContainer("Rectangles", GetAreaOfShape(this.Rectangles), this.Rectangles?.Length ?? 0),
                new ShapeStatsContainer("Triangles", GetAreaOfShape(this.Triangles), this.Triangles?.Length ?? 0)
            };
        }
        private int GetAreaOfShape(IShape[]? shapes)
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
    }

}