
namespace ShapesProject
{
    using System.Xml.Serialization;
    public class XmlDeserializer : IDeserializer
    {

        public string FilePath { get; set; }
        public XmlDeserializer(string filePath)
        {
            this.FilePath = filePath;
        }
        public ShapesContainer Deserialize()
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ShapesContainer));

            FileStream fileStream = new FileStream(this.FilePath, FileMode.Open);
            var deserializer = xmlSerializer.Deserialize(fileStream);

            fileStream.Close();

            if (deserializer == null || (ShapesContainer)deserializer == null)
                throw new Exception("Could not open file {fileName}");

            var shapes = (ShapesContainer)deserializer;
            shapes.filter();

            return shapes;
        }

        public void Serialize(string newFileName, ShapesContainer shapes)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ShapesContainer));

            using (TextWriter writer = new StreamWriter("./xmlFiles/file2.xml"))
            {
                xmlSerializer.Serialize(writer, shapes);
            }
        }
    }
}