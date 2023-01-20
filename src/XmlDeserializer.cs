
namespace ShapesProject
{
    using System.Xml.Serialization;
    public class XmlDeserializer : IDeserializer
    {

        public XmlDeserializer() { }
        public RootShapesObject Deserialize(string fileName)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(RootShapesObject));

            FileStream fileStream = new FileStream(fileName, FileMode.Open);
            var deserializer = xmlSerializer.Deserialize(fileStream);

            fileStream.Close();

            if (deserializer == null || (RootShapesObject)deserializer == null)
                throw new Exception("Could not open file {fileName}");

            return (RootShapesObject)deserializer;
        }

        public void Serialize(string newFileName, RootShapesObject shapes)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(RootShapesObject));

            using (TextWriter writer = new StreamWriter("./xmlFiles/file2.xml"))
            {
                xmlSerializer.Serialize(writer, shapes);
            }
        }
    }
}