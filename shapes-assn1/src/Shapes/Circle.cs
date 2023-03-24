namespace ShapesProject
{
    public interface ICircle : IEllipse
    {
        double Radius { get; set; }
    }
    public class Circle : ICircle
    {
        public Circle(double Radius) { this.Radius = Radius; }

        public Circle() { this.Radius = 0; }

        public double Radius { get; set; }

        public double Area => Math.PI * Radius * Radius;

        public double Radius1 { get => this.Radius; }
        public double Radius2 { get => this.Radius; }
        public bool isValid() => (this.Radius > 0);
    }
}