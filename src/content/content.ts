/**
 *
 */
// import * as iframeFetch from '@/modules/iframe-access';
import '@/utils/sdk/content-sdk';
import { injectBox, initPageEvent } from '@/content/util';
// iframeFetch.content();
injectBox();
initPageEvent();
