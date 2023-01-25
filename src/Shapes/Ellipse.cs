namespace ShapesProject
{
    public class Ellipse : IShape
    {
        public double Radius1 { get; set; }
        public double Radius2 { get; set; }
        public Ellipse(double Radius1, double Radius2)
        {
            this.Radius1 = Radius1;
            this.Radius2 = Radius2;
        }
        public Ellipse() { this.Radius1 = 0; this.Radius2 = 0; }

        public double Area => System.Math.PI * Radius1 * Radius2;
        public bool isValid() => (Radius1 > 0 && Radius2 > 0);
    }
}