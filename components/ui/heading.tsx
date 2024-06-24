interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}
const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
  return (
    <div className={className || ""}>
      <h2 className="text-2xl font-semibold trackin-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
