namespace ShapesProject
{
    public class EllipseContainer
    {
        public NonCircle[]? NonCircles { get; set; }
        public Circle[]? Circles { get; set; }
        public EllipseContainer(
            NonCircle[]? nonCircles = null,
            Circle[]? circles = null
        )
        {
            this.NonCircles = nonCircles;
            this.Circles = circles;
        }
        public double TotalArea() => this.CirclesArea() + this.EllipsesArea();
        public double CirclesArea() => Circles?.Sum(c => c.Area) ?? 0;
        public double EllipsesArea() => NonCircles?.Sum(nc => nc.Area) ?? 0;
        public void Filter()
        {
            this.Circles = this.Circles?.Where(c => c.isValid()).ToArray();
            this.NonCircles = this.NonCircles?.Where(nc => nc.isValid()).ToArray();
        }
    }
    public class TriangleContainer
    {
        public Scalene[]? Scalenes { get; set; }
        public Equilateral[]? Equilaterals { get; set; }
        public Isosceles[]? Isosceles { get; set; }
        public TriangleContainer() { }
        public TriangleContainer(
            Scalene[]? scalenes = null,
            Equilateral[]? equilaterals = null,
            Isosceles[]? isosceles = null
        )
        {
            this.Scalenes = scalenes;
            this.Equilaterals = equilaterals;
            this.Isosceles = isosceles;
        }
        public double ScalenesArea() => Scalenes?.Sum(s => s.Area) ?? 0;
        public double EquilateralsArea() => Equilaterals?.Sum(e => e.Area) ?? 0;
        public double IsoscelesArea() => Isosceles?.Sum(i => i.Area) ?? 0;
        public double TotalArea() => this.ScalenesArea() + this.EquilateralsArea() + this.IsoscelesArea();
        public void Filter()
        {
            this.Scalenes = this.Scalenes?.Where(s => s.isValid()).ToArray();
            this.Equilaterals = this.Equilaterals?.Where(e => e.isValid()).ToArray();
            this.Isosceles = this.Isosceles?.Where(i => i.isValid()).ToArray();
        }
    }
    public class RectangleContainer
    {
        public Square[]? Squares { get; set; }
        public NonSquare[]? NonSquares { get; set; }
        public RectangleContainer() { }
        public RectangleContainer(
            Square[]? squares = null,
            NonSquare[]? nonSquares = null
        )
        {
            this.Squares = squares;
            this.NonSquares = nonSquares;
        }
        public double SquaresArea() => Squares?.Sum(s => s.Area) ?? 0;
        public double NonSquaresArea() => NonSquares?.Sum(ns => ns.Area) ?? 0;
        public double TotalArea() => this.SquaresArea() + this.NonSquaresArea();
        public void Filter()
        {
            this.Squares = this.Squares?.Where(s => s.isValid()).ToArray();
            this.NonSquares = this.NonSquares?.Where(ns => ns.isValid()).ToArray();
        }
    }
    public class ShapesContainer
    {
        public EllipseContainer? Ellipses { get; set; }
        public TriangleContainer? Triangles { get; set; }
        public RectangleContainer? Rectangles { get; set; }
        public ShapesContainer() { }
        public ShapesContainer(
            EllipseContainer? ellipseContainer,
            TriangleContainer? triangleContainer,
            RectangleContainer? rectangleContainer)
        {
            this.Ellipses = ellipseContainer;
            this.Triangles = triangleContainer;
            this.Rectangles = rectangleContainer;
        }
        public double TotalArea() => this.Ellipses?.TotalArea() + this.Triangles?.TotalArea() + this.Rectangles?.TotalArea() ?? 0;
        public void Filter()
        {
            this.Ellipses?.Filter();
            this.Triangles?.Filter();
            this.Rectangles?.Filter();
        }
    }

}