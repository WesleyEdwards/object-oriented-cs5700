namespace ShapesProject
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var fileName = "./jsonFiles/file2.json";
            var newFileName = "./ouptutFiles/file2.json";

            var JsonDeserializer = new JsonDeserializer();
            // var XmlDeserializer = new XmlDeserializer();

            var DataStore = new ShapesDataStore(JsonDeserializer);

            System.Console.WriteLine($"Deserializing file {fileName}");
            DataStore.DeserializeFile(fileName);
            System.Console.WriteLine("Displaying stats");
            DataStore.DisplayStats();
            System.Console.WriteLine($"Creating output file {newFileName}");
            DataStore.CreateOutputFile(newFileName);

        }
    }
}
