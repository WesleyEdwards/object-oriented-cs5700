namespace ShapesProject
{
    public class Circle : IShape
    {
        public double Radius { get; set; }

        public Circle() { this.Radius = 0; }


        public double Area
        {
            get
            {
                Console.WriteLine("Circle Area" + Radius);
                var areaCalculator = new AreaCalculator();
                return areaCalculator.AreaOfEllipse(Radius, Radius);
            }
        }

    }
}