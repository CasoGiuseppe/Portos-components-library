import { beforeEach, describe, expect, it, vi } from 'vitest';

import BaseList from '@/components/base/base-list/BaseList.vue';
import { mountComponent } from '@/shared/tests/utilities';
import { Mode } from '../types';
import {
    $providedRow,
    $providedList,
    $providedComponent
} from './utilities';

let $wrapper: any;

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('BaseList component tests', () => {
    describe('Test slots behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });
          });
      
          it('Should all slot have a correct content', () => {
            expect($wrapper.html()).toContain($providedRow);
            expect($wrapper.html()).toContain($providedComponent);
          });
    });

    describe('Test props behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });
        });
      
        it('Should render a li element for each list item', () => {
            const liElements = $wrapper.findAll('li');
            expect(liElements).toHaveLength($providedList.length);
        });

        it('Should select an option by default when current prop is defined', async () => {
            const currentIndex = 0;
            const currentValue = $providedList[currentIndex].option;

            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList,
                    current: currentValue
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const liElement = $wrapper.findAll('li')[currentIndex];

            expect(liElement.element.dataset.current).toBe('true');
            expect(liElement.element.dataset.option).toBe(currentValue);
            expect(liElement.element.dataset.index).toBe(currentIndex.toString());
        });

        it('Should set data-mode according to mode prop', async () => {
            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList,
                    mode: Mode.DROPDOWN
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const ulElement = $wrapper.find('ul');
            expect(ulElement.element.dataset.mode).toBe(Mode.DROPDOWN);
        });
    });

    describe('Test emits behaviours', () => {
        it('Should emit send event when enter, space or click events are dispached', async () => {
            $wrapper = await mountComponent(BaseList, {
                props: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const liElement = await $wrapper.find('li');

            await liElement.trigger('keyup.enter');
            await liElement.trigger('keyup.space');
            await liElement.trigger('click');
    
            expect($wrapper.emitted()).toHaveProperty('send');
            expect($wrapper.emitted().send).toHaveLength(3);
        });
    });

    describe('Test events behaviours', () => {
        it('Should dispatch select function when enter, space or click events are dispached', async () => {
            $wrapper = await mountComponent(BaseList, {
                global: {
                    mocks: {
                        select: vi.fn()
                    }
                },
                props: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const liElement = await $wrapper.find('li');

            await liElement.trigger('keyup.enter');
            await liElement.trigger('keyup.space');
            await liElement.trigger('click');
    
            expect($wrapper.vm.select).toHaveBeenCalledTimes(3);
        });

        it('Should dispatch keyMove function when keys up or down are pressed', async () => {
            $wrapper = await mountComponent(BaseList, {
                global: {
                    mocks: {
                        keyMove: vi.fn()
                    }
                },
                props: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const liElement = await $wrapper.find('li');

            await liElement.trigger('keyup.up');
            await liElement.trigger('keyup.down');
    
            expect($wrapper.vm.keyMove).toHaveBeenCalledTimes(2);
        });

        it('Should dispatch focus function when focus event has actived', async () => {
            $wrapper = await mountComponent(BaseList, {
                global: {
                    mocks: {
                        focus: vi.fn()
                    }
                },
                props: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const liElement = await $wrapper.find('li');
            await liElement.trigger('focus');

            expect($wrapper.vm.focus).toHaveBeenCalled();
        });
    });

    describe('Test functions behaviours', () => {
        describe('keyMove function', () => {
            it('Should call keyHandler inside method according to keyCode', async () => {
                $wrapper = await mountComponent(BaseList, {
                    global: {
                        mocks: {
                            keyHandler: {
                                ArrowDown: vi.fn(),
                                ArrowUp: vi.fn()
                            }
                        }
                    },
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                await $wrapper.vm.$nextTick()

                const { keyMove } = $wrapper.vm;

                keyMove({ code: 'ArrowDown' }, $wrapper.vm.keyHandler);
                expect($wrapper.vm.keyHandler.ArrowDown).toHaveBeenCalled();

                keyMove({ code: 'ArrowUp' }, $wrapper.vm.keyHandler);
                expect($wrapper.vm.keyHandler.ArrowUp).toHaveBeenCalled();
            });
        });

        describe('keyHandler functions', () => {
            describe('ArrowDown function', () => {
                it('Should increase tabIndex if tabIndex is not equal to listSize', async () => {
                    $wrapper = await mountComponent(BaseList, {
                        props: {
                            list: $providedList
                        },
                        slots: {
                            row: $providedRow,
                            component: $providedComponent
                        }
                    });
    
                    const { ArrowDown } = $wrapper.vm.keyHandler;
                    
                    expect($wrapper.vm.tabIndex).toBe(0);
                    ArrowDown();
                    expect($wrapper.vm.tabIndex).toBe(1);
                });

                it('Should set tabIndex to 0 if it is equal to listSize', async () => {
                    $wrapper = await mountComponent(BaseList, {
                        props: {
                            list: $providedList
                        },
                        slots: {
                            row: $providedRow,
                            component: $providedComponent
                        }
                    });
    
                    const { ArrowDown } = $wrapper.vm.keyHandler;

                    $wrapper.vm.tabIndex = 4;
                    
                    expect($wrapper.vm.tabIndex).toBe(4);
                    ArrowDown();
                    expect($wrapper.vm.tabIndex).toBe(0);
                });
            });

            describe('ArrowUp function', () => {
                it('Should decrease tabIndex if tabIndex is not equal 0', async () => {
                    $wrapper = await mountComponent(BaseList, {
                        props: {
                            list: $providedList
                        },
                        slots: {
                            row: $providedRow,
                            component: $providedComponent
                        }
                    });
    
                    const { ArrowUp } = $wrapper.vm.keyHandler;

                    $wrapper.vm.tabIndex = 4;
                    
                    expect($wrapper.vm.tabIndex).toBe(4);
                    ArrowUp();
                    expect($wrapper.vm.tabIndex).toBe(3);
                });

                it('Should set tabIndex value the listSize value if it is equal to 0', async () => {
                    $wrapper = await mountComponent(BaseList, {
                        props: {
                            list: $providedList
                        },
                        slots: {
                            row: $providedRow,
                            component: $providedComponent
                        }
                    });
    
                    const { ArrowUp } = $wrapper.vm.keyHandler;

                    $wrapper.vm.tabIndex = 0;
                    
                    expect($wrapper.vm.tabIndex).toBe(0);
                    ArrowUp();
                    expect($wrapper.vm.tabIndex).toBe(4);
                });
            });
        });

        describe('getDOMElementByData function', () => {
            it('Should return undefined if listParent is falsy', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { getDOMElementByData } = $wrapper.vm;

                $wrapper.vm.listParent = null;
                expect(getDOMElementByData({ index: 0 })).toBeUndefined();
            });

            it('Should return li element according to index', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { getDOMElementByData } = $wrapper.vm;
                const liElement = $wrapper.findAll('li')[0];
                const elementReturned = getDOMElementByData({ index: 0 });

                expect(elementReturned.dataset).toEqual(liElement.element.dataset);
            });

            it('Should return undefined if the index is not rendered', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { getDOMElementByData } = $wrapper.vm;
                const elementReturned = getDOMElementByData({ index: 10 });

                expect(elementReturned).toBeUndefined();
            });
        });

        describe('focus function', () => {
            it('Should undefined if index is falsy', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const ulElement = await $wrapper.find('ul');
                const { focus } = $wrapper.vm;

                $wrapper.vm.tabIndex = 0;

                expect(focus({ target: ulElement.element })).toBeUndefined();
                expect($wrapper.vm.tabIndex).toEqual(0);
            });

            it('Should update tabIndex with index found value', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const liElement = await $wrapper.findAll('li')[2];
                const { focus } = $wrapper.vm;

                $wrapper.vm.tabIndex = 0;

                expect(focus({ target: liElement.element })).toBeUndefined();
                expect($wrapper.vm.tabIndex).toEqual(2);
            });
        });

        describe('select function', () => {
            it('Should update currentOption value according payload', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { select } = $wrapper.vm;
                const liElement = await $wrapper.find('li');

                expect($wrapper.vm.currentNode).toBeUndefined();
                select(liElement.element);
                expect($wrapper.vm.currentNode).toEqual($providedList[0].option);

                expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
                expect($wrapper.emitted()).toHaveProperty('send');
            });

            it('Should dispatch preventDefault and stopPropagation methods if payload is an Event', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { select } = $wrapper.vm;

                window.addEventListener('click', event => {
                    event.stopPropagation = vi.fn();
                    event.preventDefault = vi.fn();

                    select(event);

                    expect(event.stopPropagation).toHaveBeenCalled();
                    expect(event.preventDefault).toHaveBeenCalled();
                    
                });

                window.document.body.click()
            });
        });

        describe('startSelectingOption function', () => {
            it('Should not dispatch send emit if listParent is falsy', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { startSelectingOption } = $wrapper.vm;

                $wrapper.vm.lisParent = null;
                startSelectingOption();

                expect($wrapper.emitted()).not.toHaveProperty('send');
            });

            it('Should not dispatch send emit if startNode is falsy', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { startSelectingOption } = $wrapper.vm;
                startSelectingOption();

                expect($wrapper.emitted()).not.toHaveProperty('send');
            });

            it('Should dispatch send emit if startNode and listParent are truthly', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList,
                        current: $providedList[0].option
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { startSelectingOption } = $wrapper.vm;
                
                startSelectingOption();
                expect($wrapper.emitted()).toHaveProperty('send');
            });
        });

        describe('startListMaxHeight function', () => {
            it('Should return undefined if listParent or visibleOption are falsy', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                $wrapper.vm.lisParent = null;

                const { startListMaxHeight } = $wrapper.vm;
                expect(startListMaxHeight()).toBeUndefined();
            });

            it('Should return undefined if not found li elements', async () => {
                $wrapper = await mountComponent(BaseList, {
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { startListMaxHeight } = $wrapper.vm;
                expect(startListMaxHeight()).toBeUndefined();
            });

            it('Should return undefined if the li elements are less than visibleOptions prop', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList,
                        visibleOptions: 100
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { startListMaxHeight } = $wrapper.vm;
                expect(startListMaxHeight()).toBeUndefined();
            });

            it('Should update listParent maxHeight', async () => {
                $wrapper = await mountComponent(BaseList, {
                    props: {
                        list: $providedList,
                        visibleOptions: 2
                    },
                    slots: {
                        row: $providedRow,
                        component: $providedComponent
                    }
                });

                const { startListMaxHeight } = $wrapper.vm;
                startListMaxHeight();
                
                expect($wrapper.vm.listParent.style._values)
                    .toMatchObject({ '--max-height': '0px' });
            });
        });
    });
});