
export default async function main({ $, gsap: { tl }, properties, id }) {
  //When initially instantiated, we give it a generic name, which we replace with the id from the metadata
  const container = $('#text');
  container.id = id;

  const style = container.style;
  container.innerText = properties.string;
  style.marginLeft = `${properties.textLeftBoundary}px`;
  style.width = `${properties.textRightBoundary}px`;
  style.marginTop = `${properties.textTopBoundary}px`;
  style.height = `${properties.textBottomBoundary}px`;
  style.fontFamily = properties.fontFamily;
  style.fontWeight = properties.fontWeight;
  style.fontSize = `${properties.fontSize}px`;
  style.color = properties.fontColor;
  style.textAlign = properties.fontAlign;
  style.opacity = properties.startOpacity;
  style.position = "relative"

  tl.to($(`#${id}`), { opacity: properties.baseOpacity, duration: 1 });
}

export function fadeOut({ $, gsap: { tl }, properties, id }) {
  tl.to($(`#${id}`), { opacity: properties.endOpacity, duration: 1 });
}

