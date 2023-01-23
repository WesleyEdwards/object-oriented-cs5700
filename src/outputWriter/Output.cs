namespace ShapesProject
{

    public enum OutputType { Console, File }

    public class OutputDest
    {
        public OutputType outputType { get; set; }
        public string? FilePath { get; set; }
    }
    public interface IOutputWriter
    {
        void Write(ShapesContainer shapes);
    }
}