namespace ShapesProject
{
    public interface IShape
    {
        double Area { get; }
        bool isValid();
    }

    public interface ITriangle : IShape
    {
        double Side1 { get; }
        double Side2 { get; }
        double Side3 { get; }
    }
    public interface IRectangle : IShape
    {
        double Length { get; }
        double Width { get; }
    }
    public interface IEllipse : IShape
    {
        double Radius1 { get; }
        double Radius2 { get; }
    }




}