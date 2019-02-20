export default function (text, allow = ['b', 'i', 'br', 'url', 'img']) {
  let ret = text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  if (allow.indexOf('b') >= 0) {
    ret = ret.replace(/\[b\](.*?)\[\/b\]/g, '<b>$1</b>')
  }
  if (allow.indexOf('i') >= 0) {
    ret = ret.replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>')
  }
  if (allow.indexOf('br') >= 0) {
    ret = ret.replace(/\[br\]/g, '<br>')
  }
  if (allow.indexOf('url') >= 0) {
    ret = ret.replace(/\[url=(.+?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>')
    ret = ret.replace(/\[url\](.*?)\[\/url\]/g, '<a href="$1">$1</a>')
  }
  if (allow.indexOf('img') >= 0) {
    ret = ret.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1"></img>')
  }
  return ret
}
