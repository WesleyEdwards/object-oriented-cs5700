namespace ShapesProject
{
    public class Ellipse : IShape
    {
        public double radius1 { get; set; }
        public double radius2 { get; set; }
        // public Ellipse(double radius1, double radius2)
        // {
        //     this.radius1 = radius1;
        //     this.radius2 = radius2;
        // }
        public Ellipse() { this.radius1 = 0; this.radius2 = 0; }

        public double Area
        {
            get
            {
                var areaCalculator = new AreaCalculator();
                return areaCalculator.AreaOfEllipse(radius1, radius2);
            }
        }
    }
}