namespace ShapesProject
{
    public class NonSquare : IRectangle
    {
        public NonSquare(double Length1, double Length2)
        {
            this.Length1 = Length1;
            this.Length2 = Length2;
        }
        public NonSquare() { Length1 = 0; Length2 = 0; }

        public double Length1 { get; set; }
        public double Length2 { get; set; }

        public double Area => Length1 * Length2;

        public double Length { get => this.Length1; }
        public double Width { get => this.Length2; }
        public bool isValid() => (Length1 > 0 && Length2 > 0);
    }
}