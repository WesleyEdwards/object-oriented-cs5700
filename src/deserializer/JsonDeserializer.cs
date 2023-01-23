namespace ShapesProject
{
    using Newtonsoft.Json;
    public class JsonDeserializer : IDeserializer
    {

        public string FilePath { get; set; }
        public JsonDeserializer(string filePath)
        {
            this.FilePath = filePath;
        }

        public ShapesContainer Deserialize()
        {
            var file = File.ReadAllText(this.FilePath);

            var shapes = JsonConvert.DeserializeObject<ShapesContainer>(File.ReadAllText(this.FilePath));

            if (shapes == null) throw new Exception("Could not deserialize file {fileName}");
            shapes.filter();

            return shapes;
        }
        public void Serialize(string newFileName, ShapesContainer shapes)
        {
            var json = JsonConvert.SerializeObject(shapes, Formatting.Indented);
            File.WriteAllText(newFileName, json);
        }
    }
}