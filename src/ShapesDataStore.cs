namespace ShapesProject

{
    interface IShapesDataStore
    {
        RootShapesObject Shapes { get; set; }
        IDeserializer SerializerManager { get; set; }
        void DisplayStats();
        void DeserializeFile(string FileName);
        void CreateOutputFile(string FileName);
    }
    public class ShapesDataStore : IShapesDataStore
    {
        public RootShapesObject Shapes { get; set; }
        public IDeserializer SerializerManager { get; set; }

        public ShapesDataStore(IDeserializer serializerManager)
        {
            this.Shapes = new RootShapesObject();
            this.SerializerManager = serializerManager;
        }

        public void DisplayStats()
        {
            System.Console.WriteLine($"Circles: {this.Shapes.Circles?.Length}");
            System.Console.WriteLine($"Ellipses: {this.Shapes.Ellipses?.Length}");
            System.Console.WriteLine($"Squares: {this.Shapes.Squares?.Length}");
            System.Console.WriteLine($"Rectangles: {this.Shapes.Rectangles?.Length}");
            System.Console.WriteLine($"Triangles: {this.Shapes.Triangles?.Length}");
        }

        public void DeserializeFile(string FileName)
        {
            this.Shapes = this.SerializerManager.Deserialize(FileName);
        }
        public void CreateOutputFile(string FileName)
        {
            this.SerializerManager.Serialize(FileName, this.Shapes);
        }
    }
}