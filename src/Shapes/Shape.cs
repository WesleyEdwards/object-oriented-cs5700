namespace ShapesProject

{

    public interface IShape
    {
        double Area { get; }
    }
    public class Coordinates : ICoordinates
    {
        public Coordinates(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }
        public Coordinates()
        {
            this.X = 0;
            this.Y = 0;
        }
        public double X { get; set; }
        public double Y { get; set; }
    }
    public interface ICoordinates
    {
        double X { get; set; }
        double Y { get; set; }
    }
    public class QuadCoordinates
    {
        public ICoordinates Point1 { get; set; }
        public ICoordinates Point2 { get; set; }
        public ICoordinates Point3 { get; set; }
        public ICoordinates Point4 { get; set; }
        public QuadCoordinates(ICoordinates point1, ICoordinates point2, ICoordinates point3, ICoordinates point4)
        {
            this.Point1 = point1;
            this.Point2 = point2;
            this.Point3 = point3;
            this.Point4 = point4;
        }
        public QuadCoordinates()
        {
            this.Point1 = new Coordinates { };
            this.Point2 = new Coordinates { };
            this.Point3 = new Coordinates { };
            this.Point4 = new Coordinates { };
        }
    }
    public interface ITriCoordinates
    {
        ICoordinates Point1 { get; set; }
        ICoordinates Point2 { get; set; }
        ICoordinates Point3 { get; set; }
    }
    public class TriCoordinates : ITriCoordinates
    {
        public ICoordinates Point1 { get; set; }
        public ICoordinates Point2 { get; set; }
        public ICoordinates Point3 { get; set; }
        public TriCoordinates(ICoordinates point1, ICoordinates point2, ICoordinates point3)
        {
            Console.WriteLine("TriCoordinates constructor called" + point1.X + " " + point1.Y);
            this.Point1 = point1;
            this.Point2 = point2;
            this.Point3 = point3;
        }
        public TriCoordinates()
        {
            this.Point1 = new Coordinates();
            this.Point2 = new Coordinates();
            this.Point3 = new Coordinates();
        }

    }
}