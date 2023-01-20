namespace ShapesProject
{
    public class RootShapesObject
    {
        public Circle[] Circles { get; set; }
        public Ellipse[] Ellipses { get; set; }
        public Square[] Squares { get; set; }
        public Rectangle[] Rectangles { get; set; }
        public Triangle[] Triangles { get; set; }
        public RootShapesObject()
        {
            Circles = new Circle[0];
            Ellipses = new Ellipse[0];
            Squares = new Square[0];
            Rectangles = new Rectangle[0];
            Triangles = new Triangle[0];
        }
    }
}