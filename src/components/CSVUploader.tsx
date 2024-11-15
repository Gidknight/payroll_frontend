import Papa from "papaparse";

interface CsvUploaderTypes {
  label: string;
  setDocFile: (value: any) => void;
  setData: (value: any) => void;
}

const CSVUploader = ({ label, setDocFile, setData }: CsvUploaderTypes) => {
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // Set this to true if you want the first row as headers
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };
  return (
    <div className="flex flex-col items-start  md:justify-start w-full p-1">
      <label className="text-lg capitalize whitespace-nowrap text-primary font-semibold w-full md:w-1/5">
        {label}
      </label>
      <input
        type="file"
        className="text-primary"
        // onChange={({ target }) => {
        //   if (target.files) {
        //     const file = target.files[0];
        //     // setImgUrl(URL.createObjectURL(file))
        //     // setSelectedImg(URL.createObjectURL(file));
        //     setDocFile(file);
        //   }
        // }}
        onChange={handleFileUpload}
        accept=".csv"
        name="document"
        // hidden={true}
      />
    </div>
  );
};

export default CSVUploader;
