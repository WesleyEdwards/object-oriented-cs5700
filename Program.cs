namespace ShapesProject
{
    using Newtonsoft;
    using Newtonsoft.Json;
    internal class Program
    {
        private static void Main(string[] args)
        {
            var fileName = "./jsonFiles/file2.json";

            var file = File.ReadAllText(fileName);
            var shapes = JsonConvert.DeserializeObject<RootShapesObject>(File.ReadAllText(fileName));

            if (shapes == null) throw new Exception("Could not deserialize file");


            System.Console.WriteLine("\n\nCircles:");
            foreach (var shape in shapes.Circles) System.Console.WriteLine(shape.Area);
            System.Console.WriteLine("\n\nRectangles:");
            foreach (var shape in shapes.Rectangles) System.Console.WriteLine(shape.Area);

        }
    }
}
