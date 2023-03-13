const { createWorker } = require("tesseract.js");

(async () => {
  const worker = await createWorker();
  const start = new Date();
  /**
   * 👇 Loading the worker scripts from the tesseract core.
   */
  
  await worker.load();

  /**
   *  Loads traineddata from cache or download traineddata from remote
   *  Link to install traineddata https://github.com/tesseract-ocr/tessdata
   *  You can train your own custom data but thats for another blog.
   *  👇
   */
  await worker.loadLanguage("eng");

  /**
   * 👇 Initializes the Tesseract API, make sure it is ready for doing OCR tasks.
   */
  await worker.initialize("eng");

  console.log(
    "Starting recognition process.",
    "\n_________________________________\n"
  );

  const { data: { text } } = await worker.recognize("APPLYING_EXAMPLE.PNG");

  console.log(text, "\n_________________________________\n");

  const stop = new Date();
  let s = (stop - start) / 1000;
  console.log(`Time Taken -  ${s}\n\n`);

  /**
   * Terminating the worker to release the allocated ram.
   */
  await worker.terminate();
  return;
})();

