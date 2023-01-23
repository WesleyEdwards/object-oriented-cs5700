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
            var tab = "      ";

            var circle = this.Shapes.GetAreaOfShape(this.Shapes.Circles);
            var nonCircleEllipse = this.Shapes.GetAreaOfShape(this.Shapes.Ellipses);
            var nonSquareRectangle = this.Shapes.GetAreaOfShape(this.Shapes.Rectangles);
            var square = this.Shapes.GetAreaOfShape(this.Shapes.Squares);
            var rectangle = nonSquareRectangle + square;

            var triangle = this.Shapes.GetAreaOfShape(this.Shapes.Triangles);
            var scalene = this.Shapes.GetAreaTriangle(this.Shapes.Triangles, TriType.Scalene);
            var isosceles = this.Shapes.GetAreaTriangle(this.Shapes.Triangles, TriType.Isosceles);
            var equilateral = this.Shapes.GetAreaTriangle(this.Shapes.Triangles, TriType.Equilateral);

            string[] stats = new string[]
            {
                $"\n{"Total area of all shapes:",-55} {this.Shapes.GetTotalArea(),20}",
                $"{"Ellipses:",-55} {circle + nonCircleEllipse,20}",
                $"{$"{tab}Circles:",-55} {circle,20}",
                $"{$"{tab}Non-circle Ellipses:",-55} {nonCircleEllipse,20}",
                $"{"Convex Polygons:",-55} {square + triangle + rectangle,20}",
                $"{$"{tab}Triangles:",-55} {triangle,20}",
                $"{$"{tab + tab}Equilateral:",-55} {equilateral,20}",
                $"{$"{tab + tab}Isosceles:",-55} {isosceles,20}",
                $"{$"{tab + tab}Scalene:",-55} {scalene,20}",
                $"{$"{tab}Rectangles:",-55} {rectangle,20}",
                $"{$"{tab + tab}Squares:",-55} {square,20}",
                $"{$"{tab + tab}Non-square Rectangle:",-55} {nonSquareRectangle,20}",
                // $"{$"{tab + tab}Non-square Rectangles:",-55} {square,20}"
            };

            StringBuilder sb = new StringBuilder();
            foreach (var stat in stats)
            {
                sb.AppendLine(stat);
            }

            Console.WriteLine(sb.ToString());
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