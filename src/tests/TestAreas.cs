namespace ShapesProject
{
    public class TestAreas : ITest
    {
        public TestAreas()
        {

        }
        public void RunTests()
        {
            var triangle1 = new Triangle(new Coordinates(0, 0), new Coordinates(3, 0), new Coordinates(0, 4));
            if (triangle1.Area == 6) Console.WriteLine("Triangle Area Test Passed");
            else Console.WriteLine("Triangle Area Test Failed");
        }
    }
}