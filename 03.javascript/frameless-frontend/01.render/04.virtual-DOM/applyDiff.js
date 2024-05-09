/**
 * reconciliation
*/

const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes
  const n2Attributes = node2.attributes
  if (n1Attributes.length !== n2Attributes.length) { //먼저 attributes의 길이를 비교하는군
    return true
  }

  const differentAttribute = Array
    .from(n1Attributes)
    .find(attribute => {
      const { name } = attribute
      const attribute1 = node1
        .getAttribute(name)
      const attribute2 = node2
        .getAttribute(name)

      return attribute1 !== attribute2
    })

  if (differentAttribute) { //그 다음 attributes의 값 비교
    return true
  }

  if (node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent) { //그 다음 textContent 비교
    return true
  }

  return false //attributes, textContent 모두 같으면 false. main과 virtual DOM은 똑같다. 바뀐게 없다.
}


//applyDiff(document.body, main, newMain)
const applyDiff = (
  parentNode,
  realNode,
  virtualNode) => { //registry.js에서 renderRoot()함수로 만든 virtual DOM을 받아서 실제 DOM에 적용함.
  if (realNode && !virtualNode) { //realNode가 있고 virtualNode가 없으면
    realNode.remove()
    return
  }

  if (!realNode && virtualNode) { //main이 없고 virtualNode가 있으면
    parentNode.appendChild(virtualNode)
    return
  }

  if (isNodeChanged(virtualNode, realNode)) { //node가 바뀌었으면, realNode를 virtualNode로 바꿈.
    realNode.replaceWith(virtualNode)
    return
  }

  const realChildren = Array.from(realNode.children)
  const virtualChildren = Array.from(virtualNode.children)

  const max = Math.max(
    realChildren.length,
    virtualChildren.length
  )
  for (let i = 0; i < max; i++) { //자식 node역시 virtual DOM과 비교 후, 달라진게 있으면 바꿈.
    applyDiff(
      realNode,
      realChildren[i],
      virtualChildren[i]
    )
  }
}

export default applyDiff
