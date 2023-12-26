import Head from 'next/head';
import Layout from '../components/layout';
import { useState } from 'react';
import { LuCopy, LuCheck } from "react-icons/lu";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  var messageTimer;
  var copiedTimer;

  const setError = (message = 'An error has occurred.') => {
    setErrMsg(message);
    setShowError(true);
    setShowSuccess(false);
    clearTimeout(Home.messageTimer);
    Home.messageTimer = setTimeout(() => setShowError(false), 4000);
  }

  const copyCode = () => {
    const codeText = document.getElementById('code').value;
    try {
      navigator.clipboard.writeText(codeText);
      clearTimeout(Home.copiedTimer);
      Home.copiedTimer = setTimeout(() => setCopied(false), 2000);
      setCopied(true);
    } catch (error) {
      console.error('Error: Failed to copy to clipboard. ' + error);
      setError('Failed to copy to clipboard.');
    }
  }

  const precessTab = (e) => {
    const KEY_TAB = 9;
    if (e.keyCode === KEY_TAB && !e.shiftKey) {
      e.preventDefault();
      const textarea = document.querySelector('#code');
      textarea.setRangeText(
        '    ',
        textarea.selectionStart,
        textarea.selectionStart,
        'end'
      );
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setShowError(false);
    setShowSuccess(false);

    // Format form data
    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData);

    // Validate form data before request
    if ((formObj?.code || '') === '') {
      setError('Please fill out the code field.');
      return;
    }

    // Send request
    let submitDelay = setTimeout(() => setSubmitState(true), 200);
    var response;
    var data;
    var error;
    try {
      response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formObj),
      });
      data = await response.json();
    } catch (e) {
      error = e;
    }
    clearTimeout(submitDelay);
    setSubmitState(false);

    // Handle response
    if (!response?.ok || error || !data?.code) {
      setError(data?.message || `An error occurred. Please try again later. (${response?.status || error?.message || 'unknown'})`);
    } else {
      document.getElementById('code').value = data.code;
      setShowSuccess(true);
      clearTimeout(Home.messageTimer);
      Home.messageTimer = setTimeout(() => setShowSuccess(false), 2000);
    }
  }

  return (
    <Layout>
      <main className="flex flex-col min-h-screen items-center justify-between pb-5 px-2 pt-12 md:pt-20 sm:px-10 md:px-24">
        <Head>
          <title>AI code review</title>
        </Head>
        <div className="w-[42rem] max-w-full">
          <h2 className="text-center text-blue-500 text-4xl sm:text-6xl">
            AI Code Review
          </h2>
          <div className="text-center mt-1 mb-0 sm:mt-4 sm:mb-2">
            Let AI review and improve your code!
          </div>
          <form onSubmit={onSubmit} className="flex flex-col p-1 sm:p-3 w-full">
            <div className="relative w-full my-2">
              <textarea id="code"
                        name="code"
                        className={`w-full h-60 sm:h-80 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent text-[#f8f8f2] font-mono selection:bg-blue-300 selection:text-blue-900 caret-blue-500 overflow-auto rounded-md bg-[#282923] border-4 ${showError ? 'border-red-800' : 'border-neutral-500 dark:border-stone-700'} resize-none scroll-smooth whitespace-pre break-normal shadow-md drop-shadow-md px-2 py-1 focus:outline-none focus:border-blue-500`}
                        placeholder="Write some code..."
                        disabled={submitState}
                        spellCheck={false}
                        autoCorrect="false"
                        autoCapitalize="false"
                        onKeyDown={precessTab}
              / >
              <div className="absolute right-4 top-4 text-xl text-neutral-500 cursor-pointer select-none no-touch:hover:text-white active:text-white"
                   role="link"
                   onClick={copyCode}
              >{copied ? <LuCheck className="text-white" /> : <LuCopy />}</div>
            </div>
            <div className="w-full my-0 px-1 flex flex-col-reverse items-center sm:flex-row sm:items-start gap-2 sm:gap-6 justify-between">
              <div className="italic text-xs text-justify">
                No user information is collected or stored. The content of the text field is processed with <a href="https://huggingface.co/TheBloke/CodeLlama-7B-Instruct-AWQ" rel="noopener noreferrer" target="_blank" tabIndex="-1" className="underline">TheBloke's CodeLlama 7B Instruct</a> large language model (AWQ), a fast and accurate Code Llama variant, hosted by Cloudflare. Subject to their privacy policy.
              </div>
              <div className="shrink-0 my-1">
                <button type="Submit"
                        className="relative shadow-md dark:shadow-none text-white bg-blue-500 border border-blue-700 dark:border-blue-300 rounded-md py-1 px-10 flex flex-row -mt-px mr-px active:mt-0 active:-mb-px active:mr-0 active:ml-px"
                        disabled={submitState}
                >
                  {submitState && <div className="absolute border border-l-0 border-t-0 rounded-full border-white border-2 w-4 h-4 animate-spin top-2 bottom-2 left-4" />}
                  <div className="my-auto">Submit</div>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="my-1 text-center select-none">
          <p className={`text-inherit transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>Completed!</p>
          <p className={`text-red-800 transition-opacity duration-300 ${showError ? 'opacity-100' : 'opacity-0'}`}>{errMsg}</p>
        </div>
        <div className="text-center text-natural-500 text-xs select-none">
          <p>© 2023 Sören Zapp</p>
          <p>Made with Tailwind CSS and Next.js</p>
        </div>
      </main>
    </Layout>
  )
}
