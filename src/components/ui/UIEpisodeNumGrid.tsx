import { useEffect, useState, useCallback } from "react"
import { JSX } from "react/jsx-runtime";

import { Series } from "src/types";

interface Props {
  series: Series;
  currentEp: any;
  unlockEpisode: number | undefined;
  handleEpisodeClick: (index: number) => any;
}

const SECTION_RANGE = 30;

const UIEpisodeNumGrid = (props: Props) => {
  const [section, setSection] = useState(1);
  
  const handleSectionChange = (index: any) => {
    setSection(index + 1);
  }

  const renderEpisodeSection = useCallback(() => {
      const sectionList = [];
  
      for (let i = 0; i < Math.ceil(props.series?.ep_count / SECTION_RANGE); i++) {
        sectionList.push(
          <div key={'section-' + i}>
            <span className={`${section - 1 == i ? 'selected' : ''}`} onClick={() => handleSectionChange(i)}>
              {`${1 + (i * SECTION_RANGE)}-${props.series?.ep_count < ((i+1) * SECTION_RANGE) ? props.series?.ep_count : ((i+1) * SECTION_RANGE)}`}
            </span>
            {i < Math.ceil(props.series?.ep_count / SECTION_RANGE) - 1 && <span className='separator'>|</span>}
          </div>
        )
      }
  
      return sectionList;
    }, [section, props.series])
  
    const renderEpisodeGrid = useCallback(() => {
      const gridList: JSX.Element[] = [];

      for (let i = (section - 1) * SECTION_RANGE; i < section * SECTION_RANGE; i++) {
       
        gridList.push(
        <div key={'episode-' + i} className='container' onClick={() =>{ props.handleEpisodeClick(i) }}>
          <div className={`box ${props.unlockEpisode ? (i + 1 <= props.unlockEpisode ? '' : 'locked') : ''} ${props.currentEp?.episode_num === i+1 ? 'selected' : ''} `}>{i+1}</div>
        </div>
        )
      
        if(i + 1 === props.series?.ep_count) {
          break;
        }

      }

  
      return gridList
    }, [section, props.series, props.unlockEpisode, props.currentEp])

  useEffect(() => {
    if(props.currentEp) {
      setSection(Math.ceil(props.currentEp?.episode_num / SECTION_RANGE));
    }
  }, [props.currentEp])

  return (
    <div className='episode-grid'>
      <div className='section'>
        {renderEpisodeSection()}
      </div>
      <div className='grid-wrap'>
        {renderEpisodeGrid()}
      </div>
    </div>
  )
}

export default UIEpisodeNumGrid;