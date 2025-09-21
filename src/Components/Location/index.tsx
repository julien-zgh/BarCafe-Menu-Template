export const Location = () => {
    return (
      <>
        <h1
          style={{ fontFamily: "var(--font-pacifico)" }}
          className="text-center pt-4 pb-4 text-6xl"
        >
          Find Us
        </h1>
        <div className="w-3/4 h-[400px] flex justify-center items-center mx-auto mb-16">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4124.343914659024!2d35.64213887633793!3d34.12290861399457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f5d004db2642b%3A0xebf847b75fc1a305!2sSpace%20cafe%20bar!5e1!3m2!1sen!2slb!4v1758437379941!5m2!1sen!2slb" // paste your iframe src here
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </>
    );
}