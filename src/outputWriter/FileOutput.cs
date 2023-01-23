using System.Text;

namespace ShapesProject
{
    public class FileOutput : IOutputWriter
    {
        public string FilePath { get; set; }
        public FileOutput(string filePath)
        {
            FilePath = filePath;
        }
        public void Write(ShapesContainer shapes)
        {
            var csv = new StringBuilder();

            string title = "Total area of all shapes";
            int area = shapes.GetTotalArea();

            var newLine = string.Format("{0},{1},{2},{3}", 1, "", title, area);
            csv.AppendLine(newLine);

            var shapeStats = shapes.GetShapesStats();
            var index = 2;
            foreach (var stats in shapeStats)
            {
                var line = string.Format("{0},{1},{2},{3}", index, stats.TotalShapes, stats.ShapeName, stats.TotalArea);
                csv.AppendLine(line);
                index++;
            }

            File.WriteAllText(this.FilePath, csv.ToString());
        }
    }
}