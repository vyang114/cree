import { pipeline } from '@xenova/transformers';

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to translate a sentence.
 */
class MyTranslationPipeline {
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    // static task = 'automatic-speech-recognition';
    // static model = 'facebook/mms-1b-all';
    // static target_lang = 'eng';
    static instance = null;
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            // this.instance = pipeline(this.task, this.model, { progress_callback });
            this.instance = pipeline('automatic-speech-recognition', 'Xenova/whisper-small', { progress_callback });
        }
        console.log("this.instance", this.instance)
        return this.instance;
    }
}

// Listen for messages from the main thread
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', async (event) => {
    // Retrieve the translation pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    let translator = await MyTranslationPipeline.getInstance(x => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        /* eslint-disable-next-line no-restricted-globals */
        self.postMessage(x);
    });

    // Actually perform the translation
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang,
        src_lang: event.data.src_lang,

        // Allows for partial output
        callback_function: x => {
            /* eslint-disable-next-line no-restricted-globals */
            self.postMessage({ 
                status: 'update',
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            });
        }
    });

    // Send the output back to the main thread
    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage({ 
        status: 'complete',
        output: output,
    });
});