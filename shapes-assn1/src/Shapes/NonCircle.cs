namespace ShapesProject
{
    public interface INonCircle : IEllipse { }
    public class NonCircle : INonCircle
    {
        public NonCircle(double Radius1, double Radius2)
        {
            this.Radius1 = Radius1;
            this.Radius2 = Radius2;
        }
        public double Radius1 { get; set; }
        public double Radius2 { get; set; }

        public double Area => Math.PI * Radius1 * Radius2;
        public bool isValid() => (Radius1 > 0 && Radius2 > 0);
    }
}