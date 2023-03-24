using System.Text;

namespace ShapesProject

{
    public class ShapesDataStore
    {
        public ShapesContainer Shapes { get; set; }
        public IDeserializer SerializerManager { get; set; }
        public IOutputWriter Output { get; set; }

        public ShapesDataStore(IDeserializer serializerManager, IOutputWriter output)
        {
            Shapes = new ShapesContainer();
            SerializerManager = serializerManager;
            Output = output;
        }

        public void DeserializeFile()
        {
            this.Shapes = this.SerializerManager.Deserialize();
        }
        public void WriteOutput()
        {
            this.Output.Write(this.Shapes);
        }
    }
}