namespace ShapesProject
{
    public class TestDeserializeJson : ITest
    {
        public TestDeserializeJson() { }
        public void RunTests()
        {
            var deserializer = new JsonDeserializer();
            var shapes = deserializer.Deserialize("./jsonFiles/file1.json");
            if (shapes == null) throw new Exception("Could not deserialize file");
            Console.WriteLine(shapes.Circles?.Length);
            Console.WriteLine(shapes.Ellipses?.Length);
            // Console.WriteLine(shapes.Squares?.Length);
            // Console.WriteLine(shapes.Rectangles?.Length);
            Console.WriteLine(shapes.Ellipses?.Length);

            Console.WriteLine(shapes.Ellipses?[0].Area);

        }
    }
}