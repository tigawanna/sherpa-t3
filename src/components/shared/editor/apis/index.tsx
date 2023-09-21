import Cherry from 'cherry-markdown';
import './index.css'

const APIs = (props: { cherry: React.MutableRefObject<Cherry | null> }) => {
  const setMarkdownValue = () => {
    const value = (document.getElementById('markdown-value') as HTMLInputElement).value;
    props.cherry.current?.setMarkdown(value);
  }
  const setMarkdownValueKeepCursor = () => {
    const value = (document.getElementById('markdown-value-keep-cursor') as HTMLInputElement).value;
    props.cherry.current?.setMarkdown(value, true);
  }
  return (
    <div className='apis' >
      <h1> Cherry API</h1>

      <div className='apis__item'>
        <h2>setMarkdown(content:string, keepCursor = false)</h2>
        <div className='introduce__title'>
        <div className='title--en' >set value</div>
        </div>
        <div className='content--en'>setValue(content: string, keepCursor=false) has the same function; KeepCursor=true Keeps the cursor position when updating content.</div>
        <div className='content__operate'>
          <div className='content__operate__item'>
            <input id='markdown-value' defaultValue="#输入内容" />
            <button onClick={setMarkdownValue}>set markdown Value</button>
          </div>
          <div className='content__operate__item'>
            <input id='markdown-value-keep-cursor' defaultValue="#输入内容，并保持光标位置" />
            <button onClick={setMarkdownValueKeepCursor}>set markdown Value keep cursor</button>
          </div>
        </div>
      </div>
    </div >
  )

};

export default APIs;
