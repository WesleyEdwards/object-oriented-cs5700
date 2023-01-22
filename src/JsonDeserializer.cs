namespace ShapesProject
{
    using Newtonsoft.Json;
    public class JsonDeserializer : IDeserializer
    {

        public JsonDeserializer() { }

        public RootShapesObject Deserialize(string fileName)
        {
            var file = File.ReadAllText(fileName);

            var shapes = JsonConvert.DeserializeObject<RootShapesObject>(File.ReadAllText(fileName));

            if (shapes == null) throw new Exception("Could not deserialize file {fileName}");
            shapes.filter();

            return shapes;
        }
        public void Serialize(string newFileName, RootShapesObject shapes)
        {
            var json = JsonConvert.SerializeObject(shapes, Formatting.Indented);
            File.WriteAllText(newFileName, json);
        }
    }
}