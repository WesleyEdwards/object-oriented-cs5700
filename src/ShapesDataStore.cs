using System.Text;

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
            Shapes = new RootShapesObject();
            SerializerManager = serializerManager;
        }

        public void DisplayStats()
        {
            var shapesStats = this.Shapes.GetShapesStats();
            Console.WriteLine($"\n\nTotal area of all shapes: {this.Shapes.GetTotalArea()}");
            foreach (var shapeStat in shapesStats)
            {
                Console.WriteLine($"{shapeStat.ShapeName}: {shapeStat.TotalShapes}");
            }
            Console.WriteLine("\n\n");
        }

        public void DeserializeFile(string FileName)
        {
            this.Shapes = this.SerializerManager.Deserialize(FileName);
        }
        public void CreateOutputFile(string FileName)
        {
            this.SerializerManager.Serialize(FileName, this.Shapes);
        }
        public void CreateCsvFile(string filePath)
        {
            var csv = new StringBuilder();

            string title = "Total area of all shapes";
            int area = this.Shapes.GetTotalArea();

            var newLine = string.Format("{0},{1},{2},{3}", 1, "", title, area);
            csv.AppendLine(newLine);

            var shapeStats = this.Shapes.GetShapesStats();
            var index = 2;
            foreach (var stats in shapeStats)
            {
                var line = string.Format("{0},{1},{2},{3}", index, stats.TotalShapes, stats.ShapeName, stats.TotalArea);
                csv.AppendLine(line);
                index++;
            }


            File.WriteAllText(filePath, csv.ToString());



        }
    }
}